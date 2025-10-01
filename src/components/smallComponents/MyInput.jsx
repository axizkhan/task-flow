import React from 'react'
import { Input } from '@base-ui-components/react/input';

function MyInput({w=150,h=9,text='l',border="border-gray-400",round="rounded-[10px]",place="name" ,value,onChange}) {
  return (
    <Input placeholder={place} className={`w-${w} ${h} text-${text} px-2 ${border} border-2   ${round}`} value={value} onChange={onChange}  />
  );
}

export default MyInput