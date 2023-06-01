import { BasicLayout } from '../../components/layouts'
import { SInfo, STab } from '../../views/account'

const AccountPage = () => {
  return (
    <BasicLayout fix={false} title="Mi Cuenta">
      <SInfo />
      <STab />
    </BasicLayout>
  )
}

export default AccountPage
