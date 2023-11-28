interface ILoadingInProgressState {
  state: ELoadingStatus.LOADING;
}

interface ILoadingFailedState {
  state: ELoadingStatus.FAILURE;
  message: string;
  statusCode: number;
}

interface ILoadingSuccessState {
  state: ELoadingStatus.SUCCESS;
}

enum ELoadingStatus {
  LOADING = 'loading',
  FAILURE = 'failure',
  SUCCESS = 'success',
}

type TLoadingState =
  | ILoadingInProgressState
  | ILoadingFailedState
  | ILoadingSuccessState
  | undefined;

export {
  ILoadingInProgressState,
  ILoadingFailedState,
  ILoadingSuccessState,
  ELoadingStatus,
  TLoadingState,
};
