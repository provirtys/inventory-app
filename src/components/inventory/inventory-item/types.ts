import type { IInventoryItem } from "@/store/inventory/types"

export interface IProps{
  item: IInventoryItem
  active?: boolean
}

export const defaultProps = {
  active: false
}