import React from 'react';
import { UserPlus, FileText } from 'lucide-react';

const VolunteerReg = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 lg:px-8 text-center">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl text-blue-800 mb-4 font-bold">Join Our Movement!</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Take the first step towards making a difference in your community
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-center items-stretch">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 lg:p-10 flex-1 min-w-0 max-w-md mx-auto lg:mx-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-blue-200">
          <div className="flex items-center justify-center mb-6">
            <UserPlus className="w-16 h-16 text-blue-800" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-5 text-blue-800">STEP 1</h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Register as a volunteer on the{' '}
            <a 
              href="https://mybharat.gov.in/" 
              target='_blank' 
              className="text-orange-500 font-semibold hover:text-orange-600 hover:underline transition-colors duration-300"
            >
              MyBharat portal
            </a>
            .
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 lg:p-10 flex-1 min-w-0 max-w-md mx-auto lg:mx-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-green-200">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-5 text-green-600">STEP 2</h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Fill the{' '}
            <a 
              href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=vDsaA3zPK06W7IZ1VVQKHJoDdm6dAj9NvMDyKNlznNdUN01EWFdDRkhYUzlUTzBHNVRKM05SQU5ZQy4u&route=shorturl" 
              target='_blank' 
              className="text-orange-500 font-semibold hover:text-orange-600 hover:underline transition-colors duration-300"
            >
              registration form
            </a>
            {' '}with all the necessary details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerReg;