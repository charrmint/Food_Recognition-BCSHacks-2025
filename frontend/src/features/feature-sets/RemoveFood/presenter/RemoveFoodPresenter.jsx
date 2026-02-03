import { useRemoveFood } from "../models/useRemoveFood"
import { RemoveFoodView } from "../views/RemoveFoodView"

const RemoveFoodPresenter = () => {
    const removeFoodProps = useRemoveFood()

    return <RemoveFoodView {...removeFoodProps} />
}

export default RemoveFoodPresenter