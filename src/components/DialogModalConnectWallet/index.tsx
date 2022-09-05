import ButtonGroupWalletOptions from '@components/ButtonGroupWalletOptions'
import DialogModal from '@components/DialogModal'
import useAccount from '@hooks/useAccount'
import { createEffect } from 'solid-js'

export const DialogModalConnectWallet = (props) => {
  const { accountData } = useAccount()
  createEffect(() => {
    if (accountData()?.address) props.api().close()
  })
  return (
    <DialogModal title="Connect your wallet" description="Connect your Ethereum wallet to continue." api={props.api}>
      <ButtonGroupWalletOptions />
    </DialogModal>
  )
}

export default DialogModalConnectWallet
