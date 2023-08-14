export interface iUserObj {
  email: string;
  password: string;
  uuid: string;
}

export interface iUpdateUserObj {
  email?: string;
  password?: string;
  id: number;
}

export interface iCreateDecision {
  [key: string]: string | number | boolean | void;
  name: string;
  selectedOptionId?: number;
  isDecided?: boolean;
  userId: number;
  priorityFieldId?: number;
  negativeFieldId?: number;
}

export interface iUpdateDecision {
  [key: string]: string | number | boolean | void;
  name?: string;
  selectedOptionId?: number;
  isDecided?: boolean;
  priorityFieldId?: number;
  negativeFieldId?: number;
  userUuid?: string;
}
