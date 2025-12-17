"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";

export default function TestSelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Escolha uma opção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Opção 1</SelectItem>
        <SelectItem value="2">Opção 2</SelectItem>
      </SelectContent>
    </Select>
  );
}