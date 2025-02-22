import { IUser } from "mgwdev-m365-helpers";
import * as React from "react";
import {
  Persona,
  Spinner,
  PersonaProps,
  PresenceBadgeStatus
} from "@fluentui/react-components";
import { useGraph } from "../context/GraphContext";
import { PersonaService } from "../services/PersonaService";


export interface IGraphPersonaProps extends PersonaProps {
  id?: string;
  user?: IUser;
  showPresence?: boolean;
  showSecondaryText?: boolean;
  hidePrimaryText? :boolean;
}

export function GraphPersona(props: IGraphPersonaProps) {
  const { id } = props;
  const { graphClient } = useGraph();
  const getPresence = (presenceString?: string) => {
    switch (presenceString) {
      case "":
        return "offline";
      case "Available":
        return "available";
      case "Busy":
        return "busy";
      case "Away":
        return "away";
      case "DoNotDisturb":
        return "do-not-disturb";
      case "Offline":
        return "offline";
      case "PresenceUnknown":
        return "unknown";
      case "OutOfOffice":
        return "out-of-office";
      case "Blocked":
        return "blocked";
      case "BeRightBack":
        return "away";
      case "BusyIdle":
        return "busy";
      case "AvailableIdle":
        return "available";
      default:
        return presenceString?.toLowerCase() as PresenceBadgeStatus;
    }
  };
  const personaService = React.useRef(new PersonaService(graphClient, props.showPresence))
  const [loading, setLoading] = React.useState(!props.user);
  const [user, setUser] = React.useState<IUser | undefined>(props.user);
  const getUserInfo = async () => {
    const userResult = await personaService.current.getUser(id!);
    //@ts-ignore
    setUser({
      ...props.user,
      ...userResult,
    });
    setLoading(false);
  };
  React.useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Spinner />
  }

  const primaryText = user?.displayName || props.name || props.title || props.id;

  return (
    <Persona
      {...props}
      primaryText={ props.hidePrimaryText ? undefined: primaryText}
      secondaryText={props.showSecondaryText ? user?.jobTitle : undefined}
      avatar={{
        image: { src: user?.photo },
        initials: user?.displayName?.split(" ").map(x => x[0]).join("") || props.name?.split(" ").map(x => x[0]).join(""),
      }}
      presence={
        props.showPresence
          ? {
            status: getPresence(user?.presence?.availability),
            outOfOffice: user?.presence?.outOfOfficeSettings?.isOutOfOffice
          }
          : undefined
      }
    />
  );
}
