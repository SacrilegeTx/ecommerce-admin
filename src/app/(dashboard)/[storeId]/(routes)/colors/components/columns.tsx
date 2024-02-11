"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export interface ColorColumn {
  id: string;
  name: string;
  value: string;
  createAt: string;
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <span>{row.original.value}</span>
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
