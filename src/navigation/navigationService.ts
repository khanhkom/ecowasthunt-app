import type { ParamListBase } from '@react-navigation/native';

import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export const navigationReference =
  createNavigationContainerRef<ParamListBase>();

export function goBack() {
  if (navigationReference.isReady() && navigationReference.canGoBack()) {
    navigationReference.goBack();
  }
}

export function navigate(name: string, parameters?: object) {
  if (navigationReference.isReady()) {
    navigationReference.navigate(name as never, parameters as never);
  }
}

export function popToTop() {
  if (navigationReference.isReady()) {
    navigationReference.dispatch(StackActions.popToTop());
  }
}

export function replace(name: string, parameters?: object) {
  if (navigationReference.isReady()) {
    navigationReference.dispatch(StackActions.replace(name, parameters));
  }
}
