import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, Edit3, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFullName(data.full_name || 'Uday Gupta');
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          user_id: user.id,
          email: user.email,
          full_name: 'Uday Gupta',
          avatar_url: user.user_metadata?.avatar_url
        };
        
        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) throw createError;
        
        setProfile(createdProfile);
        setFullName('Uday Gupta');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName || 'Uday Gupta'
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile({ ...profile, full_name: fullName || 'Uday Gupta' });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFullName(profile?.full_name || 'Uday Gupta');
    setIsEditing(false);
  };

  const getInitials = () => {
    const name = profile?.full_name || 'Uday Gupta';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const displayName = profile?.full_name || 'Uday Gupta';
  const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navigation />
      <div className="pt-20 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <div className="flex items-center gap-4 mb-4 justify-center">
              <BackButton />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Profile
              </h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card */}
          <Card className="shadow-elegant">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-gradient-primary text-white text-xl font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{displayName}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email}
              </CardDescription>
              <div className="flex justify-center gap-2 mt-4">
                <Badge variant="secondary" className="gap-1">
                  <Calendar className="w-3 h-3" />
                  Joined {joinDate}
                </Badge>
                <Badge variant="outline">Active User</Badge>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6 space-y-6">
              {/* Personal Information */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  {!isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 px-3 py-2 bg-muted rounded-md">
                        {displayName}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="mt-1 px-3 py-2 bg-muted rounded-md text-muted-foreground">
                      {user?.email}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Account Stats */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Courses Created</div>
                  </div>
                  <div className="bg-gradient-secondary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">48</div>
                    <div className="text-sm text-muted-foreground">Study Hours</div>
                  </div>
                  <div className="bg-gradient-to-r from-accent/10 to-warning/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-accent">95%</div>
                    <div className="text-sm text-muted-foreground">Avg Score</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;