import { type UUID } from 'uuid';

enum InitiatorType {
  AdminUser = 'ADMIN_USER',
  User = 'USER',
  System = 'SYSTEM',
}

type InitiatorId = string | UUID;

export class Initiator {
  type: InitiatorType;
  id: InitiatorId;
}

export class AdminInitiator extends Initiator {
  public type = InitiatorType.AdminUser;

  constructor(public id: string) {
    super();
  }

  public static build(id: string): AdminInitiator {
    return new AdminInitiator(id);
  }
}

export class UserInitiator extends Initiator {
  public type = InitiatorType.User;

  constructor(public id: UUID) {
    super();
  }

  public static build(id: UUID): UserInitiator {
    return new UserInitiator(id);
  }
}

export class SystemInitiator extends Initiator {
  public type = InitiatorType.System;

  constructor(public id: string) {
    super();
  }

  public static build(systemType: string, systemId: string): SystemInitiator {
    return new SystemInitiator(`${systemType}::${systemId}`);
  }
}
