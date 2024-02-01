'use client'

import React, {useState} from "react";
import { Tabs,Tab, Input,Link, Button,Card,CardBody,CardHeader,} from "@nextui-org/react";

const ResetPassword = () => {
  const [selected, setSelected] = useState("login");
  return (
    <div className="">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
            <h1>เปลี่ยนรหัสผ่านสำเร็จ</h1>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResetPassword;
