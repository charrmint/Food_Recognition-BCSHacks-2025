import { useInventory } from "../models/useInventory"
import { InventoryView } from "../views/InventoryView"

const InventoryPresenter = () => {
    const inventoryProps = useInventory()

    return <InventoryView {...inventoryProps} />
}

export default InventoryPresenter