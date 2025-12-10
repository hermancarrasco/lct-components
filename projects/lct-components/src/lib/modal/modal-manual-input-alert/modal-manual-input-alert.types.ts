export type ManualInputAlertType = 'keyboard' | 'laser';

export interface ModalManualInputAlertData {
  finish: boolean;
  type?: ManualInputAlertType;
}

