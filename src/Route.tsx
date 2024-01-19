
import CustomerMasterForm from "./Pages/UserMaster/Add";
import NotFound from "./Components/NotFound";
import CustomerEditForm from "./Pages/UserMaster/Update";
import CustomerTable from "./Pages/UserMaster";


const AdminRoutes = [
   
   {
    path : "/customer/add",
    name : "Customer Form",
    component : CustomerMasterForm, 
    exact : true
   },
   {
    path : "/customer/:id/edit",
    name : "Customer Form",
    component : CustomerEditForm ,
    exact : true
   },
  
   {
    path : "/",
    name : "Customers",
    component : CustomerTable,
   },

   { path: "*", name: 'Not Found', component: NotFound },
];

export { AdminRoutes };
