export interface IProps{
  type?: string,
  placeholder?: string,
}

export const defaultProps:IProps = {
  type: 'number',
  placeholder: '',
}

export interface IEmits{
  (e: 'update:modelValue', value: string): void
}
