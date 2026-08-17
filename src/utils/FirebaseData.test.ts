import { snapshotCollection } from 'utils/FirebaseData'
import type { Subject } from 'types/domain'

describe('snapshotCollection', () => {
  it('converts a representative typed Firebase collection', () => {
    const subject: Subject = {
      subjectId: 'subject-1',
      courseCode: 'IT 101',
      subjectTitle: 'Introduction to IT',
      creditUnits: '3',
      subjectDescription: 'Foundation subject',
    }

    expect(snapshotCollection<Subject>({
      val: () => ({ [subject.subjectId]: subject }),
    })).toEqual([subject])
  })

  it('preserves the existing missing-collection behavior', () => {
    expect(snapshotCollection<Subject>({ val: () => null })).toEqual([])
  })
})
