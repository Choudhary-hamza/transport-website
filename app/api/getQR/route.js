import { getCompanyQr } from "@/lib/admin";
import { NextResponse } from "next/server";
export async function GET(){
    const data =await getCompanyQr();
    if(!data){
        NextResponse.json({message:"error while getting qr"},{status:404})
    }
    return NextResponse.json({qr:data},{status:200})
}