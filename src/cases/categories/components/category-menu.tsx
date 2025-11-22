import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useCategories } from "../hooks/use-category";
import { useEffect, useState } from "react";
import type { CategoryDTO } from "../dtos/category.dto";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export function CategoryMenu() {
  const { data: categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
  const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

  // Recupera o ID ativo da URL
  const activeCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    if (categories) {
      setVisibleItems(categories.slice(0, 5));
      setHiddenItems(categories.slice(5));
    }
  }, [categories]);

  // Função que manipula a URL
  function handleSelect(categoryId?: string) {
    const newParams = new URLSearchParams(searchParams);

    if (categoryId) {
      newParams.set("categoryId", categoryId);
    } else {
      newParams.delete("categoryId");
    }

    setSearchParams(newParams);
  }

  return (
    <nav className="w-full py-4 flex items-center justify-between">
      <div className="flex flex-col">
        <h5 className="font-medium text-2xl text-gray-900">Nossos Produtos</h5>
        <p className="text-sm text-gray-500">Novos produtos todos os dias</p>
      </div>
      
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => handleSelect(undefined)}
          className={cn(
            !activeCategoryId
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "text-gray-600"
          )}
        >
          Todos
        </Button>
        {visibleItems.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            onClick={() => handleSelect(category.id)}
            className={cn(
              category.id === activeCategoryId
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "text-gray-600"
            )}
          >
            {category.name}
          </Button>
        ))}
        {hiddenItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Mais
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {hiddenItems.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => handleSelect(category.id)}
                  className={cn(
                    "cursor-pointer",
                    category.id === activeCategoryId && "bg-green-100 text-green-700 font-medium"
                  )}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}