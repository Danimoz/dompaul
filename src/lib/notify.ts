import { toast } from 'react-toastify'

type NotificationProps = {
  type: "success" | "error"
  message: string
}

export function notify({type, message}: NotificationProps){
  type === 'success' ? 
    toast.success(message)
    :
    toast.error(message)
}