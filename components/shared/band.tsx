import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { teamMembers } from '@/constants/team-members'
import { TeamMember } from '@/types/team'
import { Separator } from '../ui/separator'
import { Award, GraduationCap } from 'lucide-react'
import { Button } from '../ui/button'
interface Props {
	className?: string
}

export const Band: React.FC<Props> = ({ className }) => {
	return (
		<Sheet>
			<SheetTrigger>
				<div
					tabIndex={0}
					className={cn(
						'relative w-[160px] iphone:w-[180px]  select-none flex flex-col gap-2 items-center justify-center border border-border shadow-sm shadow-red-950 hover:shadow-red-600 hover:scale-105 duration-300 ease-in-out cursor-pointer rounded-[20px] bg-background active:shadow-red-600 active:scale-95',
						className,
					)}
				>
					<Image
						src='/images/band.png'
						alt='ArtGaley'
						width={200}
						height={200}
						className='z-10 rounded-3xl  p-0'
					/>
					{/* <div className='z-30 absolute top-2 flex flex-row items-center justify-center gap-1'>
						<Label className='text-foreground font-bold text-md'>Наши </Label>

						<Label className='text-red-600 font-bold text-md'>достижения</Label>
					</div> */}
				</div>
			</SheetTrigger>
			<SheetContent className='w-full overflow-y-auto max-h-dvh'>
				<SheetHeader>
					<SheetTitle className='text-foreground font-bold text-3xl mb-4'>
						Труппа театра
					</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className='w-full flex flex-col gap-4 rounded-3xl items-start justify-start '>
					{teamMembers.map((member: TeamMember, idx: number) => (
						<div
							key={member.id ?? idx}
							className='rounded-[30px] bg-background/80 w-full border border-border p-4 shadow-sm shadow-red-950'
						>
							<div className='flex flex-col gap-4 items-center justify-center w-full'>
								<Avatar className='w-32 h-32 border border-border shadow-sm shadow-red-950'>
									<AvatarImage
										src={
											member.avatar
												? `/images/avatars/${member.avatar}`
												: '/images/masks.png'
										}
										alt={member.name}
										className='object-cover'
									/>

									<AvatarFallback>AG</AvatarFallback>
								</Avatar>

								<Label className='text-foreground text-2xl font-bold'>
									{member.name}
								</Label>
								<div className=' flex flex-wrap gap-1 items-center justify-center'>
									{member.roles.map((role, idx) => (
										<Badge
											variant={'default'}
											key={idx}
											className='iphone:text-base'
										>
											{role}
										</Badge>
									))}
								</div>
								<Separator />
								<Tabs className='flex flex-col items-center justify-center w-full'>
									<TabsList>
										{member.education.length > 0 && (
											<TabsTrigger value='education'>
												<div className='flex flex-row gap-1 items-center justify-center'>
													<GraduationCap size={16} />

													<p>Образование</p>
												</div>
											</TabsTrigger>
										)}
										<TabsTrigger
											value='achievements'
											className='[&[data-state=inactive]>div]:inline-flex relative'
										>
											<div className='hidden absolute -top-2 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-75 animate-ping' />
											<div className='hidden absolute -top-2 -right-1 w-3 h-3 bg-red-600 rounded-full ' />
											<div className=' flex flex-row gap-1 items-center justify-center'>
												<Award size={16} />

												<p>Достижения</p>
											</div>
										</TabsTrigger>
									</TabsList>
									{member.education.length > 0 && (
										<TabsContent
											value='education'
											className='flex flex-col gap-2 items-center justify-center'
										>
											{member.education.map((edu, idx) => (
												<Label
													key={idx}
													className='iphone:text-base text-center'
												>
													{edu}
												</Label>
											))}
										</TabsContent>
									)}
									<TabsContent
										value='achievements'
										className='flex flex-col gap-2 items-center justify-center'
									>
										{member.experience.map((exp, idx) => (
											<Label key={idx} className='iphone:text-base text-center'>
												{exp}
											</Label>
										))}
									</TabsContent>
								</Tabs>
							</div>
						</div>
					))}
				</div>
				<SheetFooter className='my-6'>
					<SheetClose asChild>
						<Button variant='secondary' className='h-12 text-xl w-full'>
							Закрыть
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
