import { InstanceRepository } from "@/app/api/lib/repository/InstanceRepository";
import { AuthenticationService } from "@/app/api/lib/service/AuthenticationService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(): Promise<Response> {
    if (!InstanceRepository.isUserAuthorized(cookies())) {
        return new NextResponse(null, { status: 403 })
    }

    InstanceRepository.saveInstanceAdminAuth({
        from: 'local',
        password: ''
    })

    const response = new NextResponse(null, { status: 204 });

    return AuthenticationService.removeCookieTokenFromResponse(response);
}