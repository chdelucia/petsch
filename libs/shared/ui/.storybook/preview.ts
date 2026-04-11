import { applicationConfig, type Preview } from '@storybook/angular';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { importProvidersFrom } from '@angular/core';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(getTranslocoTestingModule())],
    }),
  ],
};

export default preview;
