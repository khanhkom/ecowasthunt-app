# Navigation

## TabNavigator

TabNavigator là một bottom tab navigation với 5 tab, trong đó tab ở giữa là nút cộng để báo cáo rác thải.

### Cấu trúc

- **Tab 1**: Trang chủ (Home)
- **Tab 2**: Bản đồ (Map)
- **Tab 3**: Nút cộng (Add) - để báo cáo rác thải
- **Tab 4**: Thử thách (Challenges)
- **Tab 5**: Cộng đồng (Community)
- **Tab 6**: Cá nhân (Profile)

### Cách sử dụng

TabNavigator đã được tích hợp vào Application.tsx và có thể truy cập thông qua route `MainTabs`.

```tsx
// Navigate to MainTabs
navigation.navigate(Paths.MainTabs);
```

### Tính năng

1. **Nút cộng ở giữa**: Khi bấm sẽ navigate đến màn hình ReportWaste
2. **Theme support**: Tự động thay đổi màu sắc theo theme
3. **Custom icons**: Sử dụng CustomIcon component
4. **Responsive design**: Tab bar có shadow và elevation

### Customization

Bạn có thể tùy chỉnh:

- Màu sắc trong `screenOptions`
- Icon cho từng tab
- Label cho từng tab
- Style của nút cộng

### Lưu ý

- TabNavigator sử dụng `@react-navigation/bottom-tabs`
- Nút cộng sử dụng `navigationReference` để navigate
- Tất cả icons đều sử dụng CustomIcon component
