export type UserRole = 'admin' | 'administrator' | 'area chair' | 'faculty'

export interface UserProfile {
  uid: string
  employeeId: string
  name: string
  email: string
  userType: UserRole
  department: string
  photoUrl?: string
}

export interface Subject {
  subjectId: string
  courseCode: string
  subjectTitle: string
  creditUnits: string
  subjectDescription: string
}

export interface SchoolYear {
  syId: string
  syTitle: string
  syStart: string
  syEnd: string
  syDateCreated?: string
  syStatus?: string
}

export interface Post {
  postId: string
  postTitle: string
  postDescription: string
  postFile: string
  postFileUrl?: string
  postStatus: string
  postDate: string
  uid: string
  syId: string
  subjectId: string
  postAuthor: string
}

export interface Comment {
  postId?: string
  commentId: string
  commentString: string
  commentDate: string
  uid: string
  name: string
}

export interface Notification {
  notificationId: string
  notificationTitle: string
  notificationMessage: string
  notificationDate: string
  notificationStatus: string
  notificationType: string
  postId: string
  uid: string
}

export interface HistoryRecord {
  historyId: string
  historyDate: string
  previousPost: Post
}
