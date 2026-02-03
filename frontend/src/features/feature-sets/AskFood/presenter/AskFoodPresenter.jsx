import { useAskFood } from '../models/useAskFood'
import { AskFoodView } from '../views/AskFoodView'

const AskFoodPresenter = () => {
    const askFoodProps = useAskFood()

    return <AskFoodView {...askFoodProps} />
}

export default AskFoodPresenter