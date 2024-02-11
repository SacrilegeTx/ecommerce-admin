"use client";

import { useParams } from "next/navigation";

import { useOrigin } from "@/hooks/use-origin";

import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export function ApiList({ entityName, entityIdName }: ApiListProps) {
  const params = useParams();
  const origin = useOrigin();

  const { storeId } = params;

  const baseUrl = `${origin}/api/${storeId.toString()}`;

  return (
    <>
      <ApiAlert description={`${baseUrl}/${entityName}`} title="GET" variant="public" />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="GET"
        variant="public"
      />
      <ApiAlert description={`${baseUrl}/${entityName}`} title="POST" variant="admin" />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="PATCH"
        variant="admin"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="DELETE"
        variant="admin"
      />
    </>
  );
}
