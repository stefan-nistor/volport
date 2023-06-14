import React from 'react'
import {useRouter} from 'next/router';
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';

const Page = () => {
  const router = useRouter();
  const {id} = router.query;
  console.log(router)
  console.log(id)

  return(
    <div>
      <h1>Project Detail: {id}</h1>
    </div>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Page;