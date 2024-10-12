
import HomeIcon from "./HomeIcon";
import GoogleIcon from "./GoogleIcon";
import OrderIcon from "./OrdersIcon";
import DashboardIcon from "./DashboardIcon"
import ServicesIcon from "./ServicesIcon"
import UserHomeIcon from "./UserHomeIcon"
import TrackingIcon from "./TrackingIcon"
import DeliveryIcon from "./DeliveryIcon"
import HistoryIcon from "./HistoryIcon"
import ContactIcon from "./ContactIcon"
import SettingIcon from "./SettingIcon"
import BellFill from "./BellFill"

const iconPack = {
    HomeIcon,
    GoogleIcon,
    OrderIcon,
    DashboardIcon,
    ServicesIcon,
    UserHomeIcon,
    TrackingIcon,
    DeliveryIcon,
    HistoryIcon,
    ContactIcon,
    SettingIcon,
    BellFill
};

export { iconPack };

export type TIconPack = keyof typeof iconPack;

export const iconNames = Object.keys(iconPack) as TIconPack[];