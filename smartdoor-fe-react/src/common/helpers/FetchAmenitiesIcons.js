import a_commonCafe_icon from '../../assets/icons/a_commonCafe_icon.svg';
import a_commonLobby_icon from '../../assets/icons/a_commonLobby_icon.svg';
import a_conferenceHall_icon from '../../assets/icons/a_conferenceHall_icon.svg';
import a_powerBackup_icon from '../../assets/icons/a_powerBackup_icon.svg';

import g_badminton_icon from '../../assets/icons/g_badminton_icon.svg';
import g_basketball_icon from '../../assets/icons/g_basketball_icon.svg';
import g_childrenplayarea_icon from '../../assets/icons/g_childrenplayarea_icon.svg';
import g_clubhall_icon from '../../assets/icons/g_clubhall_icon.svg';
import g_common_parking_icon from '../../assets/icons/g_common_parking_icon.svg';
import g_cricketpitch_icon from '../../assets/icons/g_cricketpitch_icon.svg';
import g_gated_community_icon from '../../assets/icons/g_gated_community_icon.svg';
import g_gym_icon from '../../assets/icons/g_gym_icon.svg';
import g_inhousemarket_icon from '../../assets/icons/g_inhousemarkert_icon.svg';
import g_joggingtrack_icon from '../../assets/icons/g_joggingtrack_icon.svg';
import g_lift_icon from '../../assets/icons/g_lift_icon.svg';
import g_pipedgas_icon from '../../assets/icons/g_pipedgas_icon.svg';
import g_playground_icon from '../../assets/icons/g_playground_icon.svg';
import g_podiumspace_icon from '../../assets/icons/g_podiumspace_icon.svg';
import g_power_backup_icon from '../../assets/icons/g_power_backup_icon.svg';
import g_sauna_icon from '../../assets/icons/g_sauna_icon.svg';
import g_security_ser_icon from '../../assets/icons/g_security_ser_icon.svg';
import g_snooker_icon from '../../assets/icons/g_snooker_icon.svg';
import g_squashcourt_icon from '../../assets/icons/g_squashcourt_icon.svg';
import g_steam_icon from '../../assets/icons/g_steam_icon.svg';
import g_swimmingpool_icon from '../../assets/icons/g_swimmingpool_icon.svg';
import g_tabletennis_icon from '../../assets/icons/g_tabletennis_icon.svg';
import g_tennis_icon from '../../assets/icons/g_tennis_icon.svg';

import i_bar_icon from '../../assets/icons/i_bar_icon.svg';
import i_entertainment_icon from '../../assets/icons/i_entertainment_icon.svg';
import i_gym_icon from '../../assets/icons/i_gym_icon.svg';
import i_jacuzzi_icon from '../../assets/icons/i_jacuzzi_icon.svg';
import i_mediaroom_icon from '../../assets/icons/i_mediaroom_icon.svg';
import i_personallift_icon from '../../assets/icons/i_personallift_icon.svg';
import i_spalsh_icon from '../../assets/icons/i_spalsh_pool_icon.svg';
import i_swimmingpool_icon from '../../assets/icons/i_swimmingpool_icon.svg';

export const getInternalAmenityList = (amenity) => {

    switch (amenity) {
        case 'Personal Lift':
            return i_personallift_icon;

        case 'Swimming Pool':
            return i_swimmingpool_icon;

        case 'Gym':
            return i_gym_icon;

        case 'Splash Pool':
            return i_spalsh_icon;

        case 'Jacuzzi':
            return i_jacuzzi_icon;

        case 'Bar':
            return i_bar_icon;

        case 'Media Room':
            return i_mediaroom_icon;

        case 'Entertainment Room':
            return i_entertainment_icon;


        default:
            break;
    }
};

export const getGeneralAmenityList = (amenity) => {

    switch (amenity) {
        case 'Gated community':
            return g_gated_community_icon

        case 'Security Services':
            return g_security_ser_icon

        case 'Club House':
            return g_clubhall_icon

        case 'Swimming Pool':
            return g_swimmingpool_icon

        case 'Gym':
            return g_gym_icon

        case 'Lift':
            return g_lift_icon

        case 'Common Guest Parking':
            return g_common_parking_icon

        case 'Power backup':
            return g_power_backup_icon

        case 'Playground':
            return g_playground_icon

        case 'Inhouse Market/Groceries':
            return g_inhousemarket_icon

        case 'Children Play Area':
            return g_childrenplayarea_icon

        case 'Tennis Court':
            return g_tennis_icon

        case 'Table Tennis':
            return g_tabletennis_icon

        case 'Podium Space':
            return g_podiumspace_icon

        case 'Basketball':
            return g_basketball_icon

        case 'Sauna':
            return g_sauna_icon

        case 'Steam':
            return g_steam_icon

        case 'Squash Court':
            return g_squashcourt_icon

        case 'Piped Gas':
            return g_pipedgas_icon

        case 'Cricket Pitch/Lawn':
            return g_cricketpitch_icon

        case 'Snooker/Billiards':
            return g_snooker_icon

        case 'Jogging Track':
            return g_joggingtrack_icon

        case 'Badminton':
            return g_badminton_icon

        default:
            break;
    }
};

export const getCommercialGeneralAmenityList = (amenity) => {

    switch (amenity) {
        case 'Lift':
            return i_personallift_icon

        case 'Gym':
            return i_gym_icon

        case 'Power backup':
            return a_powerBackup_icon

        case 'Common Cafeteria':
            return a_commonCafe_icon

        case 'Common Lobby':
            return a_commonLobby_icon

        case 'Conference Hall':
            return a_conferenceHall_icon

        default:
            break;
    }
};

export const getInternalAmenityListForBuilderProperty = (amenity) => {

    switch (amenity) {
        case 'Personal Lift':
            return i_personallift_icon;

        case 'Swimming Pool':
            return i_swimmingpool_icon;

        case 'Gym':
            return i_gym_icon;

        case 'Splash Pool':
            return i_spalsh_icon;

        case 'Jacuzzi':
            return i_jacuzzi_icon;

        case 'Bar':
            return i_bar_icon;

        case 'Media Room':
            return i_mediaroom_icon;

        case 'Entertainment Room':
            return i_entertainment_icon;

        case 'Lift':
            return i_personallift_icon

        case 'Gym':
            return i_gym_icon

        case 'Power backup':
            return a_powerBackup_icon

        case 'Common Cafeteria':
            return a_commonCafe_icon

        case 'Common Lobby':
            return a_commonLobby_icon

        case 'Conference Hall':
            return a_conferenceHall_icon

        case 'Gated community':
            return g_gated_community_icon

        case 'Gated Community':
            return g_gated_community_icon

        case 'Security Services':
            return g_security_ser_icon

        case 'Club House':
            return g_clubhall_icon

        case 'Swimming Pool':
            return g_swimmingpool_icon

        case 'Gym':
            return g_gym_icon

        case 'Lift':
            return g_lift_icon

        case 'Common Guest Parking':
            return g_common_parking_icon

        case 'Power backup':
            return g_power_backup_icon

        case 'Playground':
            return g_playground_icon

        case 'Inhouse Market/Groceries':
            return g_inhousemarket_icon

        case 'Children Play Area':
            return g_childrenplayarea_icon

        case 'Tennis Court':
            return g_tennis_icon

        case 'Table Tennis':
            return g_tabletennis_icon

        case 'Podium Space':
            return g_podiumspace_icon

        case 'Basketball':
            return g_basketball_icon

        case 'Sauna':
            return g_sauna_icon

        case 'Steam':
            return g_steam_icon

        case 'Squash Court':
            return g_squashcourt_icon

        case 'Piped Gas':
            return g_pipedgas_icon

        case 'Cricket Pitch/Lawn':
            return g_cricketpitch_icon

        case 'Snooker/Billiards':
            return g_snooker_icon

        case 'Jogging Track':
            return g_joggingtrack_icon

        case 'Badminton':
            return g_badminton_icon

        default:
            break;
    }
};