import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req){
    const cookie = cookies();
    const user_id = (await cookie).get('user_id').value;
    return NextResponse(user_id);
}