import { JoinLayout } from '../../../components/layouts'
import { OptimizedImage, RegisterForm } from '../../../components/ui'
import tw from 'twin.macro'
const SignUpPage = () => {
  return (
    <JoinLayout title="Crear Cuenta">
      <div tw="grid pt-[70px] text-white gap-10 lg:gap-0 lg:grid-cols-2 lg:min-h-screen lg:pt-0">
        <div tw="flex flex-col justify-center px-4 sm:px-10 lg:px-20">
          <h1 tw="text-2xl font-bold mb-4">Crear Cuenta</h1>
          <RegisterForm />
        </div>
        <OptimizedImage
          stylesImg={tw`w-full h-full object-cover`}
          src="/img/sign-wallpaper.jpg"
          width={400}
          height={400}
          alt="login"
        />
      </div>
    </JoinLayout>
  )
}

export default SignUpPage
