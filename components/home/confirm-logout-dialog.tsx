import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from "../ui/alert-dialog";

interface ILogoutConfirmationDialog {
    isAlertOpen: boolean
    setIsAlertOpen: (open: boolean) => void
    handleLogout: () => void
}
const LogoutConfirmationDialog: React.FC<ILogoutConfirmationDialog> = ({ isAlertOpen, setIsAlertOpen, handleLogout }) => (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
                <AlertDialogDescription>
                    Hành động này sẽ đăng xuất tài khoản của bạn khỏi hệ thống.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

export default LogoutConfirmationDialog;
