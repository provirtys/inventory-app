export type TColor = 'primary' | 'red'

export interface IProps{
  disabled?: boolean,
  color?: TColor,
  rounded?: boolean
}

export const defaultProps: IProps = {
  disabled: false,
  color: 'primary' as TColor,
  rounded: false
}

export interface IEmits {
  (e: 'click'): void;
}