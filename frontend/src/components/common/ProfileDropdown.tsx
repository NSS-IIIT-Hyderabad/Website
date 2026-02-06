"use client";

// Default noop export so components importing the dropdown don't break when auth isn't wired
export default function ProfileDropdown() {
	return null;
}
//             >
//                 {/* Profile Image with India Flag Border */}
//                 <div className="w-10 h-10 rounded-full p-0.5" style={{
//                     background: 'linear-gradient(to bottom, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)'
//                 }}>
//                     <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
//                         <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
//                             {getInitials()}
//                         </div>
//                     </div>
//                 </div>
//                 <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown Menu */}
//             {isOpen && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden z-50">
//                     {/* Dropdown Header */}
//                     <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4">
//                         <div className="flex items-center space-x-3">
//                             {/* Profile Image */}
//                             <div className="w-12 h-12 rounded-full p-0.5 flex-shrink-0" style={{
//                                 background: 'linear-gradient(to bottom, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)'
//                             }}>
//                                 <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
//                                     <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//                                         {getInitials()}
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             {/* User Info */}
//                             <div className="flex-1 min-w-0">
//                                 <p className="text-white font-semibold text-sm truncate">
//                                     {userData.name || 'User'}
//                                 </p>
//                                 <p className="text-blue-100 text-xs truncate">
//                                     {userData.email}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Dropdown Items */}
//                     <div className="py-2">
//                         {/* Profile Link */}
//                         <Link
//                             href={`/me/profile/${userData.uid}`}
//                             onClick={() => setIsOpen(false)}
//                             className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors duration-200 group"
//                         >
//                             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
//                                 <User className="w-5 h-5 text-blue-600" />
//                             </div>
//                             <div>
//                                 <p className="font-semibold text-gray-800 text-sm">View Profile</p>
//                                 <p className="text-xs text-gray-500">See your NSS profile</p>
//                             </div>
//                         </Link>

//                         {/* Divider */}
//                         <div className="my-2 border-t border-gray-200"></div>

//                         {/* Logout Button */}
//                         <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors duration-200 group"
//                         >
//                             <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
//                                 <LogOut className="w-5 h-5 text-red-600" />
//                             </div>
//                             <div className="text-left">
//                                 <p className="font-semibold text-gray-800 text-sm">Logout</p>
//                                 <p className="text-xs text-gray-500">Sign out from NSS Portal</p>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
