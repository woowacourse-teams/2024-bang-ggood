import type { BuildingDetailResponse } from "@/types/building";

export const buildingDetailResponse: BuildingDetailResponse = {
    "buildingId": 1,
    "buildingName": "방끗 빌라",
    "address": "서울특별시 강서구 허준로 121",
    "latitude": 34.156478,
    "longitude": 34.156478,
    "checklistCount": 45,
    "stations": [
      {
        "stationName": "잠실",
        "stationLine": "2호선",
        "walkingTime": 11
      },
      {
        "stationName": "잠실",
        "stationLine": "8호선",
        "walkingTime": 12
      }
    ],
    "isLiked": false,
    "photos": [
      "http://placehold.co/393x313",
      "http://placehold.co/393x313"
    ],
    "checklists": [
      {
        "checklistId": 2,
        "userName": "bangggood123",
        "roomName": "살기 좋은 방",
        "deposit": 2000,
        "rent": 50,
        "optionCount": 5,
        "categories": [
          {
            "categoryId": 1,
            "categoryName": '방 컨디션',
            "score": 70
          },
          {
            "categoryId": 2,
            "categoryName": "편의시설",
            "score": 60
          }
        ],
        "createdAt": "2025-10-01"
      },
      {
        "checklistId": 1,
        "userName": "bangggood123",
        "roomName": "살기 좋은 방",
        "deposit": 2000,
        "rent": 50,
        "optionCount": 5,
        "categories": [
          {
            "categoryId": 1,
            "categoryName": "청결",
            "score": 70
          },
          {
            "categoryId": 2,
            "categoryName": "편의시설",
            "score": 60
          }
        ],
        "createdAt": "2025-10-01"
      }
    ],
    "lastCursor": "2025-10-01"
  }
  