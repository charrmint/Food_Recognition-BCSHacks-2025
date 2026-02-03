import { useAddFood } from "../models/useAddFood"
import { AddFoodView } from "../views/AddFoodView"

const AddFoodPresenter = () => {
    const addFoodProps = useAddFood()

    return <AddFoodView {...addFoodProps} />
}

export default AddFoodPresenter