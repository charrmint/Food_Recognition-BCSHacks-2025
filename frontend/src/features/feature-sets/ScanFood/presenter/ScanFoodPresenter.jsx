import { useScanFood } from '../models/useScanFood'
import { ScanFoodView } from '../views/ScanFoodView'

const ScanFoodPresenter = () => {
    const scanFoodProps = useScanFood()

    return <ScanFoodView {...scanFoodProps} />
}

export default ScanFoodPresenter