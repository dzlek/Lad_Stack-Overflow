import '../src/styles/index.scss';
import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/internal/theming';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    docs: {
      theme: themes.dark,
    },

    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },

    options: {
      theme: themes.dark,
    },

    viewMode: 'story',
  },
};

export default preview;
