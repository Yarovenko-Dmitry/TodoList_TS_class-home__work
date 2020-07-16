import React from 'react';
import {action} from '@storybook/addon-actions';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
  title: 'AppWithRedux Component',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
};

// const callback = action('Button \'add\' was pressed inside the form')
const changeCallback = action('Value changed');


export const AppWithReduxBaseExample = () => {
  return (
    <AppWithRedux/>
  );
}

