import { AlertTriangleIcon, Loader2Icon, MoreVerticalIcon, PackageOpenIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import { AppHeader } from "./app-header";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-1 items-center justify-between gap-x-4 min-w-0">
      <div className="flex items-center gap-x-2 min-w-0">
        <h1 className="text-sm font-semibold truncate">{title}</h1>
        {description && (
          <span className="hidden sm:inline text-xs text-muted-foreground truncate">
            {description}
          </span>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button 
          disabled={isCreating || disabled} 
          size="sm"
          className="gap-x-1.5 font-medium shrink-0 bg-[#070b14] text-white hover:bg-[#0f1624] shadow-sm"
          onClick={onNew}
        >
          <PlusIcon className="size-3.5" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button 
          size="sm"
          className="gap-x-1.5 font-medium shrink-0 bg-[#070b14] text-white hover:bg-[#0f1624] shadow-sm"
          asChild
        >
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-3.5" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Top header bar — title, button, and search all inline */}
      <AppHeader>
        {header && (
          <div className="flex flex-1 items-center justify-between min-w-0 gap-x-3">
            {header}
            {search && (
              <div className="shrink-0">
                {search}
              </div>
            )}
          </div>
        )}
        {!header && search && (
          <div className="flex-1">{search}</div>
        )}
      </AppHeader>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-screen-xl w-full px-6 py-5 flex flex-col gap-y-3">
          {children}
        </div>
      </div>

      {/* Sticky bottom pagination */}
      {pagination && (
        <div className="border-t border-border/60 bg-background">
          <div className="mx-auto max-w-screen-xl w-full px-6">
            {pagination}
          </div>
        </div>
      )}
    </div>
  )
};

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative">
      <SearchIcon className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
      <Input 
        className="w-[180px] h-7 text-xs bg-muted/40 border-border/50 shadow-none pl-7 rounded-md focus-visible:ring-1 focus-visible:ring-primary/40 placeholder:text-muted-foreground/50"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  // Don't render pagination at all when there's only one page
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-x-2 w-full py-3">
      <div className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center gap-x-2">
        {page > 1 && (
          <Button
            disabled={disabled}
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
        )}
        {page < totalPages && (
          <Button
            disabled={disabled}
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
};

interface StateViewProps {
  message?: string;
};

export const LoadingView = ({
  message,
}: StateViewProps) => {
  return (
    <div className="flex justify-center items-center py-24 flex-col gap-y-3">
      <Loader2Icon className="size-5 animate-spin text-primary/60" />
      {!!message && (
        <p className="text-xs text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
};


export const ErrorView = ({
  message,
}: StateViewProps) => {
  return (
    <div className="flex justify-center items-center py-24 flex-col gap-y-3">
      <AlertTriangleIcon className="size-5 text-destructive/60" />
      {!!message && (
        <p className="text-xs text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
};

export const EmptyView = ({
  message,
  onNew
}: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed border-border/50 bg-muted/10 rounded-xl py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-muted/40 rounded-xl p-3">
          <PackageOpenIcon className="text-muted-foreground/40 size-6" />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle className="text-sm font-semibold">
        Nothing here yet
      </EmptyTitle>
      {!!message && (
        <EmptyDescription className="text-xs max-w-[260px] text-center leading-relaxed">
          {message}
        </EmptyDescription>
      )}
      {!!onNew && (
        <EmptyContent>
          <Button
            size="sm"
            onClick={onNew}
            className="gap-x-1.5 bg-[#070b14] text-white hover:bg-[#0f1624] shadow-sm"
          >
            <PlusIcon className="size-3.5" />
            Get started
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
};

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col gap-y-2",
      className,
    )}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
};

export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) {
      return;
    }

    if (onRemove) {
      await onRemove();
    }
  }

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "group px-4 py-3 shadow-none border-border/50 hover:border-primary/25 hover:bg-muted/20 cursor-pointer transition-all duration-150 relative overflow-hidden",
          isRemoving && "opacity-40 cursor-not-allowed pointer-events-none",
          className,
        )}
      >
        {/* Left accent bar on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center rounded-r-full" />
        <CardContent className="flex flex-row items-center justify-between p-0 gap-x-3">
          <div className="flex items-center gap-x-3 min-w-0">
            {image && (
              <div className="shrink-0 size-8 rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
                {image}
              </div>
            )}
            <div className="min-w-0">
              <CardTitle className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-150">
                {title}
              </CardTitle>
              {!!subtitle && (
                <CardDescription className="text-xs mt-0.5 truncate opacity-70">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <div className="flex gap-x-2 items-center shrink-0">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()} 
                    >
                      <MoreVerticalIcon className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive gap-x-2 cursor-pointer"
                      onClick={handleRemove}
                    >
                      <TrashIcon className="size-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
};
