import { toast } from 'sonner'

export const showSuccess = (message) => toast.success(message)
export const showError = (message) => toast.error(message)
export const showWarning = (message) => toast.warning(message)
export const showInfo = (message) => toast.info(message)
export const showDanger = (message) => toast.error(message) // Using error for danger