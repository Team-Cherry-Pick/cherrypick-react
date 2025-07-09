import { AccessTokenService } from "@/services/accessTokenService";
import { getUser } from "@/services/apiProfile";
import { currentProfileAtom } from "@/store/profile";
import { AccessTokenType } from "@/types/Api";
import { Gender, GetUserRes } from "@/types/Profile";
import { useSetAtom } from "jotai";

export function useRefreshProfile() {
    
    const setCurrentUser = useSetAtom(currentProfileAtom);

    const refreshProfile = async () => {
        
        // 비회원인 경우 기본값 세팅
        if(!AccessTokenService.hasToken(AccessTokenType.USER)) {
            setCurrentUser(({ userId: -1, nickname: "", email: "", birthday: "", gender: Gender.MALE, imageURL: "", imageId: -1}));
            return;
        }

        // 회원인 경우 API 호출 후 최신 프로필 반영
        const currentUser: GetUserRes = await getUser();
        setCurrentUser(currentUser);
    };

    return { refreshProfile };
}