export interface ShardStatus {
    name: string;
    region_tag: string;
    hostname: string;
    services: ShardStatusService[];
    slug: string;
    locales: string[];
}

export interface ShardStatusService {
    status: string;
    incidents: ShardStatusServiceIncident[];
    name: string;
    slug: string;
}

export interface ShardStatusServiceIncident {
    active: boolean;
    created_at: string;
    id: number;
    updates: ShardStatusServiceIncidentMessage[];
}

export interface ShardStatusServiceIncidentMessage {
    severity: string;
    author: string;
    created_at: string;
    translations: ShardStatusServiceIncidentMessageTranslation[];
    updated_at?: string;
    content: string;
    id: string;
    heading: string;
}

export interface ShardStatusServiceIncidentMessageTranslation {
    locale: string;
    content: string;
    updated_at?: string;
    heading: string;
}
