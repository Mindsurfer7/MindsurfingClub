import { Story } from "@storybook/react";
import { Theme, ThemeProvider } from "App/providers/ThemeProvider";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
  (
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`}>
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
