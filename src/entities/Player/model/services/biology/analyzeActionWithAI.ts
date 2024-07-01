import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { ChatCompletion, GPTmessage } from 'entities/GPT/types/GPTScheme';
import { getPlayersBiologyLevels } from '../../selectors/getPlayerData';
import { AxiosResponse } from 'axios';
import { Biology } from 'entities/Player/UI/PlayerCard/Character/types';
import { setBiologyStats } from './setBiologyStats';

const JSONtemplate = `
{
  "levels": {
      "cortisol": 65,
      "melatonin": 15,
      "serotonin": 70,
      "dopamine": 55,
      "adrenaline": 35,
      "norepinephrine": 40,
      "endorphins": 45,
      "growth_hormone": 20,
      "testosterone": 65,
      "acetylcholine": 70,
      "GABA": 40,
      "estrogen": 50,
      "oxytocin": 50,
      "insulin": 20
  },
  "changes": {
      "cortisol": -13.33,
      "melatonin": 50,
      "serotonin": 16.67,
      "dopamine": 10,
      "adrenaline": -12.5,
      "norepinephrine": -11.11,
      "acetylcholine": 0,
      "GABA": 40,
      "endorphins": 50,
      "growth_hormone": 0,
      "testosterone": 0,
      "estrogen": 0,
      "oxytocin": 25,
      "insulin": 0
  }`;

const systemMsg = {
  role: 'system',
  content: `Мы разрабатываем приложение, в котором можно эвристически делать догадки о том, какое состояние нервной и гормональной системы в данный момент находится. Мы разработали интерфейс, и сейчас нам нужна твоя помощь. 
  Твоя задача  всегда отвечать в формате JSON, Я буду давать тебе данные в формате: действие, время и пол человека, 
  Также я буду давать тебе JSON, в котором содержатся актуальные показатели биологической системы этого человека. 
  Допустим, тебе задается действие "приседания" и все остальные данные, далее ты выдаешь мне JSON, в котором гормоны и нейромедиаторы, которые были выделены во время действия "приседания".
  То есть я хочу, чтобы ты, как искусственный интеллект, обученный на большом количестве данных, высказывал предположения, 
  Какие наиболее вероятно нейромедиаторы и гормоны были выделены или какие были снижены в момент, когда было выполнено действие,
  которое тебе приходит как запрос. я хочу, чтобы ты писал ключи для JSON на английском, а значения в виде цифр от 0 до 100.
  Также я буду тебе давать текущие значения, и твой ответ должен прибавлять к этим текущим 
  значениям предположительное количество процентов. То есть, допустим, я в данный момент потренировался силовыми, 
  очень такую большую нагрузку, и это будет значить то, что кортизол увеличился значительно, то есть, например, 
  не на 10%, а, ну, там, на 40%, например, или на 50%. Но это на твое усмотрение, мы просто примерные данные прикидываем, эвристически. 
  Таким образом, если у меня кортизол был 10, то станет он 50 или 60. И таким образом получается, что я присылаю тебе один JSON,
 а ты присылаешь мне результирующий JSON, чтобы я уже дальше мог с ним работать. Вот шаблон твоего ответа, 
  четко следуй шаблону (на цифры с шаблона не обращай внимание, настоящие данные в "текущем состоянии показатей"): ${JSONtemplate} 
  Хочу, чтобы ты учитывал те начальные значения, которые я даю, актуальные на данный момент,
  они должны иметь влияние на результат. То есть, например, у нас в данный момент, если текущий инсулин 30%, 
  и я пишу то, что я поел сахара, и ты пишешь мне то, что инсулин увеличивается на 50%, то level должен быть в итоге 80%,
  а change — это 50%, такая логика. И так же со всеми остальными показателями. И обязательно учитывай что если идет понижение надо использовать перед числом минус,
   чтобы в интерфейсе верно отражался цвет (у нас красный снижение, зеленый повышение). Количество возвращаемых показателей в списке должно быть полным, в соответствии с количеством из текущих показатей
   пояснение аббревиатур: GABA - это гамма аминомасляная кислота (gamma aminobutyric acid). обрати внимание, что если ты делаешь в changes
    повышение показателя на какой-то процент, то в levels значение должно измениться по формуле X + Y,
     где x - это значение показателя из текущего показателя, а y - это значение которое ты создал в changes. 
     
   `,
};

//тебе стоит учитывать что текущие данные иногда могут не соответсвовать реальности в том смысое что последнее действие я делал вечером, где было много адрегалига
// а сейчас утром но ты снижаешь адреналин всего на 5 процентов изза характера действия не учитывая что раз прошла целая ночь он должен быть ниже процекнетов на 40 минимум
//видимо тут уже нужна история действий... адреналин 100 то это вечерние значения, надо вернуть до утренних объективных усредненных
//добавить глутамат

interface UserAction {
  action: string;
  time: string;
  gender: string;
}

// interface BiologyResponse {
//   levels: Biology,
//   changes: Biology
// }

export const analyzeActionWithAI = createAsyncThunk<
  Biology,
  UserAction,
  ThunkConfig<any>
>('Player/analyzeActionWithAI', async (userAction: UserAction, thunkAPI) => {
  const currentBiologyData = getPlayersBiologyLevels(thunkAPI.getState());

  const bioDataJSON = JSON.stringify(currentBiologyData);

  const prompt = {
    role: 'user',
    content: `текущее состояние показателей: ${bioDataJSON}, действие ${userAction.action}, пол: ${userAction.gender},  время: ${userAction.time}`,
  };

  const APIrequestBody = {
    // model: 'gpt-4o',
    model: 'gpt-3.5-turbo',
    messages: [systemMsg, prompt],
  };

  try {
    const response = await thunkAPI.extra.GPT_API.post<
      GPTmessage[],
      AxiosResponse<ChatCompletion>
    >('', JSON.stringify(APIrequestBody));

    if (!response.data) {
      throw new Error();
    }
    const parsedJSON: Biology = JSON.parse(
      response.data.choices[0].message.content,
    );

    console.log('analyze Action With AI', parsedJSON);

    thunkAPI.dispatch(setBiologyStats(parsedJSON));

    return parsedJSON;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
