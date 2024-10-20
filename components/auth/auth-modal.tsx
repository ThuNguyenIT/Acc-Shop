"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"



interface IAuthModal {
  open: boolean
  handleCloseAuthModal: () => void
  activeTab: string
  setActiveTab: (tab: string) => void;
}

const AuthModal: React.FC<IAuthModal> = ({ open, handleCloseAuthModal, activeTab, setActiveTab }) => {

  return (
    <Dialog
      open={open}
      onOpenChange={() => handleCloseAuthModal()}
    >
      <DialogTitle className=" sr-only text-center text-lg font-semibold text-gray-900">
        Chọn một phương thức
      </DialogTitle>
      <DialogContent className="p-4 sm:max-w-[425px] sm:p-6 sm:m-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full "
        >
          <TabsList className="relative grid w-full grid-cols-2 bg-transparent">
            {['login', 'register'].map((tab, index) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-custom-red data-[state=active]:shadow-none"
              >
                {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </TabsTrigger>
            ))}

            <div className="absolute left-1/2 top-1/2 h-5 w-px -translate-y-1/2 bg-gray-300"></div>
          </TabsList>
          <TabsContent value="login">
            <LoginForm handleCloseAuthModal={handleCloseAuthModal} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm handleCloseAuthModal={handleCloseAuthModal} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
export default AuthModal;