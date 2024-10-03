import { Form, Input, Button, Checkbox } from 'antd'
import { useAppDispatch } from '../../stores';
import { AuthThunk } from '../../stores/services/auth';

const Login = () => {

    const [form] = Form.useForm();
    const dispatch: any = useAppDispatch();

    const onFinish = (values: { username: string, password: string }) => {
        dispatch(AuthThunk(values))
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 uppercase">
                    {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                    EmaLogistic admin
                </a>
                <div className="w-full bg-white rounded-lg shadow -dark:border md:mt-0 sm:max-w-md xl:p-0 -dark:bg-gray-800 -dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <Form
                            layout='vertical'
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                label="Foydalanuvchi nomi"
                            >
                                <Input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5" placeholder="Foydalanuvchi nomini kiriting" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                label="Parol"
                            >
                                <Input.Password placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5" />
                            </Form.Item>
                            <div className="flex items-center justify-between">
                                <Checkbox >
                                    <label className="text-gray-500 -dark:text-gray-300">Remember me</label>
                                </Checkbox>
                                {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline -dark:text-primary-500">Forgot password?</a> */}
                            </div>
                            <Button size='large' type='primary' htmlType="submit" block>Sign in</Button>
                            {/* <p className="text-sm font-light text-gray-500 -dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline -dark:text-primary-500">Sign up</a>
                            </p> */}
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )

    // return (
    //     <div className="h-[100vh] flex items-center justify-center bg-gray-100">
    //         <div className="grid grid-cols-2 h-[420px]  text-center  w-[1000px] rounded-xl bg-white shadow-2xl">
    //             <div className=" m-auto">
    //                 <div className='max-md:py-4 max-md:px-5 rounded-md bg-white'>
    //                     <p className='text-[30px] font-bold mb-4 uppercase'>Edutracker<br /></p>
    //                     <Form
    //                         form={form}
    //                         layout="vertical"
    //                         autoComplete="off"
    //                         className='lg:w-[400px] md:w-[350px] w-[100%]'
    //                         onFinish={onFinish}
    //                     >
    //                         <Form.Item
    //                             label="Username"
    //                             name="username"
    //                             rules={[{ required: true, message: 'Please input your username!' }]}
    //                         >
    //                             <Input />
    //                         </Form.Item>

    //                         <Form.Item
    //                             label="Parol"
    //                             name="password"
    //                             rules={[{ required: true, message: 'Please input your password!' }]}
    //                         >
    //                             <Input.Password />
    //                         </Form.Item>

    //                         <Button type="primary" className='w-[100%]' htmlType='submit'>Kirish</Button>
    //                     </Form>
    //                 </div>
    //             </div>
    //             <div className="overflow-hidden rounded-e-xl max-md:hidden bg-no-repeat bg-cover login-bg"></div>
    //         </div>
    //     </div>
    // )
}
export default Login;