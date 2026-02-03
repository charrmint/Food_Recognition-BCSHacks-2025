import { useDashboard } from '../models/useDashboard'
import { DashboardView } from '../views/DashboardView'

const DashboardPresenter = () => {
    const dashboardProps = useDashboard()

    return <DashboardView {...dashboardProps} />
}

export default DashboardPresenter