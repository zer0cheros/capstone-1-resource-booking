"use client";

import useRatingCreateQuery from "@/features/rating/hooks/use-rating-create-query";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { Label } from "@/shared/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Star } from "lucide-react";
import { RateResourceProps } from "@/features/rating/types/rating";
import { cn } from "@/shared/lib/utils";

export default function RateResource({ resourceId, userId }: RateResourceProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [stars, setStars] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const { mutate, isPending } = useRatingCreateQuery();

    const handleSave = () => {
        if(stars === 0) return;

        mutate({
            resourceId: resourceId,
            userId: userId,
            stars: stars,
            comment: comment
        }, {
            onSuccess: () => {
                setOpen(false);
                setStars(0);
                setComment("");
            }
        });
    };

    return (
        <>
            <DropdownMenuItem
                onSelect={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                Leave a review
            </DropdownMenuItem>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            How was it?
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Share your experience with this resource to help the
                            community.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="py-4">
                        <Field className="flex flex-col items-center gap-3">
                            <Label className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                Your Rating
                            </Label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setStars(num)}
                                        className="transition-transform hover:scale-110 active:scale-95"
                                    >
                                        <Star
                                            size={32}
                                            className={cn(
                                                "transition-colors",
                                                num <= stars
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-slate-200",
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </Field>

                        <Field className="mt-4">
                            <Label htmlFor="comment" className="font-semibold">
                                Review Details
                            </Label>
                            <Textarea
                                id="comment"
                                placeholder="What did you like or dislike? Was it as described?"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="min-h-[100px] resize-none"
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="gap-0 md:gap-2">
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                className="font-semibold text-slate-500 rounded-2xl"
                            >
                                Skip
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={handleSave}
                            disabled={stars === 0 || isPending}
                            className="bg-gb-blue hover:bg-gb-blue/90 font-bold px-8 rounded-2xl"
                        >
                            {isPending ? "Posting..." : "Post Review"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
