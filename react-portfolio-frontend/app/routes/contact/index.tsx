
import type { Route } from "./+types";
import { Form } from "react-router";

export async function action({request}:Route.ClientActionArgs){
    const formData = await request.formData();
    const name = formData.get('name') as String;
    const email = formData.get('email') as String;
    const subject = formData.get('subject') as String;
    const message = formData.get('message') as String;

const errors: Record<string, string> = {};

if (!name?.trim()) errors.name = "Name is required";
if (!email?.trim()) {
    errors.email = "Email is required";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Invalid email format";
}
if (!subject?.trim()) errors.subject = "Subject is required";
if (!message?.trim()) errors.message = "Message is required"; 
if (Object.keys(errors).length > 0) {
    return { errors };
}

const data = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim()
}

return { successMessage: 'Form submitted successfully', data } 
}

const ContactPage = ({actionData}:Route.ComponentProps) => {
    const errors = actionData?.errors || {};
    return (
    <div className="max-w-2xl mx-auto mt-12 px-12 py-8 bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        {actionData?.successMessage?(
            <p className="mb-6 bg-green-700 text-green-100 text-center p-4 rounded-lg border border-green-500 shadow-md">
                {actionData.successMessage}
            </p>
        ): null}
        <Form method="post" className="space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
            </label>
            <input type="text" id="name" name="name" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
        {errors.name &&(
            <p className="text-red-400 text-sm mt-1">
                {errors.name}
            </p>
             )}
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
               Email
            </label>
            <input type="email" id="email" name="email" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
        
            {errors.email &&(
            <p className="text-red-400 text-sm- mt-1">
                {errors.email}
            </p>
            )}
        </div>

        <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mt-4">
                Subject 
            </label>
            <input type="text" id="subject" name="subject" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
              
            {errors.subject && (
            <p className="text-red-400 text-sm- mt-1">
                {errors.subject}
            </p>
                )}
        </div>
        
        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mt-4">
                Message 
            </label>
            <textarea id="message" name="message" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" />
            
            {errors.message && (
            <p className="text-red-400 text-sm- mt-1">
                {errors.message}
            </p>
                )}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
            Send Message
        </button>
        </Form>
    </div>
    )
}

export default ContactPage;